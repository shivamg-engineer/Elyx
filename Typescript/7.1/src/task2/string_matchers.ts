test("checks string matchers", () => {
  expect("TypeScript").toMatch(/Script/);
  expect("Jest").not.toMatch(/Mocha/);
});
