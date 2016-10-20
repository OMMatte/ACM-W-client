describe("Dummy test", function () {
    it("Dummy success", function () {
        expect(true).toBe(true);
    });
    it("Dummy fail", function () {
        expect({a: "dummy"}).toEqual({a: "dummy"});
    });
});

