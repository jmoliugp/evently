export enum Routes {
  Root = "/",
  SignIn = "/sign-in",
  Events = "#events",
}

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const assets = {
  calendar: "/assets/icons/calendar.svg",
  dollar: "/assets/icons/dollar.svg",
  hero: "/assets/images/hero.png",
  location: "/assets/icons/location-grey.svg",
  link: "/assets/icons/link.svg",
  logo: "/assets/images/logo.svg",
  menu: "/assets/icons/menu.svg",
  upload: "/assets/icons/upload.svg",
};
