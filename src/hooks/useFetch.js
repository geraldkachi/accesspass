import { useQuery } from "react-query";
import createApiClient from "../api_services/axios_config";

function useFetch({ url, key, params = {}, refetchOnWindowFocus = false, ...queryOptions }) {
	return useQuery(
		[key, params],
		async () =>
			// const axiosInstance = await createApiClient();
			createApiClient()
				.get(url, {
					data: {},
					// this filter and reduce methods below is to remove values that are invalid from params object
					params: Object.keys(params)
						.filter((f) => ![undefined, null, ""].includes(params[f]))
						.reduce(
							(acc, objKey) => ({
								...acc,

								[objKey]: params[objKey],
							}),
							{}
						),
					// returning apiResult.data ensure that we have stripped out axios layer of data, hence we are returning what's coming from the backend
				})
				.then((apiResult) => apiResult.data),
		{
			...queryOptions,
			refetchOnWindowFocus,
		}
	);
}

export default useFetch;
