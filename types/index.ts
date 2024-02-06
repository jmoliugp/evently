import { User } from "@prisma/client";

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description?: string;
    location?: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId?: string;
    price: number;
    isFree: boolean;
    url?: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
    location?: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId?: string;
    price: number;
    isFree: boolean;
    url?: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  clerkId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  event: Event;
  limit?: number;
  page: number | string;
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  price: number;
  isFree: boolean;
  imageUrl: string;
  location?: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  organizer?: {
    id: string;
    firstName: string;
    lastName: string;
    clerkId: string;
  };
  category?: {
    id: string;
    name: string;
  };
};

export type EventsWithPagination = {
  data: Event[];
  totalPages: number;
};

export type WithPagination<T> = {
  data: T[];
  totalPages: number;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  name: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: number;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date; // Check on this.
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  clerkId: string;
  limit?: number;
  page?: number;
};

export type Order = {
  id: string;
  createdAt: Date;
  stripeId: string;
  totalAmount: string | null;
  eventId: string | null;
  buyerId: string | null;
  event: Event;
  buyer: User;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
