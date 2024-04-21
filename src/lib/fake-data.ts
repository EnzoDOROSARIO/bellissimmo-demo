import {
  randAmount,
  randCity,
  randPhrase,
  randTodo,
  seed,
} from "@ngneat/falso";
import { Property } from "./models/property.entity";

seed("42");

const randomId = () => randTodo().id.split("-")[0];

const generateRandomIds = (x: number) => new Array(x).fill(x).map(randomId);

export const properties: Property[] = generateRandomIds(20).map(
  (id) =>
    ({
      id,
      name: randCity(),
      description: randPhrase(),
      price: randAmount({ min: 150000, max: 500000, symbol: "€", fraction: 0 }),
      pictureUrl: `https://picsum.photos/800/500?random=${id}`,
      isFavorite: false,
    }) as Property,
);
