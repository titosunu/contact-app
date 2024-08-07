const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  editContact,
} = require("./utils/contact");
const { validationResult, check, body } = require("express-validator");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// use template engines  ~~
app.set("view engine", "ejs");
app.use(expressLayouts);

// built in middleware ~~
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// config flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// route ~~
// home
app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main",
    title: "Home Page",
    route: "/",
  });
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main",
    title: "About Page",
    route: "/about",
  });
});

// list contact
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main",
    title: "Contact Page",
    contacts,
    msg: req.flash("msg"),
    route: "/contact",
  });
});

// add form contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main",
    title: "Contact Page",
    route: "/contact",
  });
});

// add contact / post
app.post(
  "/contact",
  [
    body("firstName").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        throw new Error("Name Contact is already in use!");
      }
      return true;
    }),
    check("email", "Email not valid").isEmail(),
    check("number", "Number Phone not valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      addContact(req.body);
      // flash
      req.flash("msg", "New Contact has been created");
      res.redirect("/contact");
    } else {
      res.render("add-contact", {
        layout: "layouts/main",
        title: "Contact Page",
        route: "/contact",
        err: result.array(),
      });
    }
  }
);

// delete contact
app.get("/contact/delete/:name", (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) {
    res.status(404);
    res.send("<h1>404 not found</h1>");
  } else {
    deleteContact(req.params.name);
    req.flash("msg", "Contact has been Deleted!");
    res.redirect("/contact");
  }
});

// form edit contact
app.get("/contact/edit/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("edit-contact", {
    layout: "layouts/main",
    title: "Contact Page",
    route: "/contact",
    contact,
  });
});

// edit contact
app.post(
  "/contact/update",
  [
    body("firstName").custom((value, { req }) => {
      const duplicate = checkDuplicate(value);
      if (value !== req.body.oldName && duplicate) {
        throw new Error("Name Contact is already in use!");
      }
      return true;
    }),
    check("email", "Email not valid").isEmail(),
    check("number", "Number Phone not valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      editContact(req.body);
      // flash
      req.flash("msg", "New Contact has been edited");
      res.redirect("/contact");
    } else {
      res.render("edit-contact", {
        layout: "layouts/main",
        title: "Contact Page",
        contact: req.body,
        route: "/contact",
        err: result.array(),
      });
    }
  }
);

// detail contact
app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", {
    layout: "layouts/main",
    title: "Contact Page",
    contact,
    route: "/contact",
  });
});

// middleware ~~
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 not found</h1>");
});

// port ~~
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
