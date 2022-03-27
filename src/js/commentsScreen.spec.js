const CommentsScreen = require("./cmmentsScreen");

const data = [{
	"id": 4,
	"date": "2019-04-24T08:23:49.511Z",
	"name": "Arianne Ashton",
	"body": "Vivamus sit amet turpis nulla. Mauris rhoncus nulla in lobortis rhoncus.",
	"likes": 91
},
{
	"id": 5,
	"date": "2019-04-24T07:26:42.511Z",
	"name": "Courteney Moreno",
	"body": "Mauris ut dolor ipsum. Phasellus imperdiet massa a dui imperdiet dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"likes": 7
}];

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(data)
	})
);

describe('CommentsScreen', () => {
	describe('comments', () => {
		let dom;
		let container = document.createElement("section");

		beforeEach(async () => {
			dom = new CommentsScreen(container);
			dom.initialise();
		});

		it('renders a heading element', () => {
			expect(container.querySelector('h2')).not.toBeNull();
			expect(getByText(container, ' 5 Comments')).toBeInTheDocument();
		  })

		it("should display comments", () => {
			expect(dom.comments.length).toEqual(5);
		});

		it("should sort comments by likes", () => {
			dom.sort = "date";
			dom.sortByDate();
			expect(dom.comments[0].likes).toBe(7);
		});

	});
});
