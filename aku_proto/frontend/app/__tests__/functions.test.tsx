import ColorbyNumber from "../components/colorByNumber";

jest.useFakeTimers();

test('Color by number test', () => {
  expect(ColorbyNumber("12")).toEqual({ text: "Safe", color: "green" });
  expect(ColorbyNumber("44")).toEqual({ text: "Warning", color: "orange" });
  expect(ColorbyNumber("73")).toEqual({ text: "Danger", color: "red" });
});
;


