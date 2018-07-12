import { release } from "../index";

const API = new Restivus({
	prettyJson: true
});

export const Rest = API;

Rest.addRoute('meteor/', {}, {
	get: () => {
		return {
			statusCode: 200,
			body: {
				release: release()
			}
		}
	}
});
