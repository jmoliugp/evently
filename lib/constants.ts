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
  hero: "/assets/images/hero.png",
  location: "/assets/images/location-grey.svg",
  logo: "/assets/images/logo.svg",
};
