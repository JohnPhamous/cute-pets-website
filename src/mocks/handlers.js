import { rest } from 'msw';
import types from './data/types.json';
import animals from './data/animals.json';
import details from './data/details.json';

export const handlers = [
  rest.get('/types', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(types));
  }),
  rest.get('/animals', (req, res, ctx) => {
    const type = req.url.searchParams.get('type');
    let response = animals.animals;

    if (type !== '') {
      response = response.filter(
        (animal) => animal.type.toLowerCase() === type.toLowerCase()
      );
    }
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get('/animals/:id', (req, res, ctx) => {
    const { id } = req.params;
    let response = details[id];

    if (!response) {
      const allValues = Object.values(details);
      const randomIndex = Math.floor(Math.random() * allValues.length);
      response = allValues[randomIndex];
    }

    return res(ctx.status(200), ctx.json(response));
  })
];
