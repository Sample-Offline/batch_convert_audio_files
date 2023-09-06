import { normalize } from "../../src/Normalizer/normalizer";

test('checks param edge cases', () => {
  expect(normalize()).toReturn(false);
});
