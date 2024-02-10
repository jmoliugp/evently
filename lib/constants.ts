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
  price: 0,
  isFree: false,
  url: "",
};

export const assets = {
  arrow: "/assets/icons/arrow.svg",
  calendar: "/assets/icons/calendar.svg",
  delete: "/assets/icons/delete.svg",
  dollar: "/assets/icons/dollar.svg",
  edit: "/assets/icons/edit.svg",
  hero: "/assets/images/hero.png",
  location: "/assets/icons/location-grey.svg",
  link: "/assets/icons/link.svg",
  logo: "/assets/images/logo.svg",
  menu: "/assets/icons/menu.svg",
  upload: "/assets/icons/upload.svg",
};

export enum ParamKey {
  Category = "category",
  Page = "page",
  SearchText = "searchText",
}
