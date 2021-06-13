import { sorter, SortTypes, SortDirections } from "../sorting";

describe("sorter", () => {
  const items = [
    {
      stringValue: "def",
      numericValue: 5,
    },
    {
      stringValue: "abc",
      numericValue: 3,
    },
    {
      stringValue: "Ghi",
      numericValue: 1,
    },
    {
      stringValue: "jkl",
      numericValue: 9,
    },
  ];
  it("sorts number values in ascending order", () => {
    const expected = [
      {
        stringValue: "Ghi",
        numericValue: 1,
      },
      {
        stringValue: "abc",
        numericValue: 3,
      },
      {
        stringValue: "def",
        numericValue: 5,
      },
      {
        stringValue: "jkl",
        numericValue: 9,
      },
    ];

    const got = sorter(
      items,
      SortTypes.NUMBER,
      SortDirections.ASCENDENT,
      "numericValue"
    );

    expect(expected).toEqual(got);
  });
  it("sorts number values in descending order", () => {
    const expected = [
      {
        stringValue: "jkl",
        numericValue: 9,
      },
      {
        stringValue: "def",
        numericValue: 5,
      },
      {
        stringValue: "abc",
        numericValue: 3,
      },
      {
        stringValue: "Ghi",
        numericValue: 1,
      },
    ];

    const got = sorter(
      items,
      SortTypes.NUMBER,
      SortDirections.DESCENDENT,
      "numericValue"
    );

    expect(expected).toEqual(got);
  });

  it("sorts STRING values in ascending order", () => {
    const expected = [
      {
        stringValue: "abc",
        numericValue: 3,
      },
      {
        stringValue: "def",
        numericValue: 5,
      },
      {
        stringValue: "Ghi",
        numericValue: 1,
      },
      {
        stringValue: "jkl",
        numericValue: 9,
      },
    ];

    const got = sorter(
      items,
      SortTypes.STRING,
      SortDirections.ASCENDENT,
      "stringValue"
    );

    expect(expected).toEqual(got);
  });

  it("sorts STRING values in descending order", () => {
    const expected = [
      {
        stringValue: "jkl",
        numericValue: 9,
      },
      {
        stringValue: "Ghi",
        numericValue: 1,
      },
      {
        stringValue: "def",
        numericValue: 5,
      },
      {
        stringValue: "abc",
        numericValue: 3,
      },
    ];

    const got = sorter(
      items,
      SortTypes.STRING,
      SortDirections.DESCENDENT,
      "stringValue"
    );

    expect(expected).toEqual(got);
  });

  it("returns the list as is if the sort direction is UNSORTED", () => {
    const expected = [
      {
        stringValue: "def",
        numericValue: 5,
      },
      {
        stringValue: "abc",
        numericValue: 3,
      },
      {
        stringValue: "Ghi",
        numericValue: 1,
      },
      {
        stringValue: "jkl",
        numericValue: 9,
      },
    ];

    const got = sorter(
      items,
      SortTypes.STRING,
      SortDirections.UNSORTED,
      "stringValue"
    );

    expect(expected).toEqual(got);
  });
});
