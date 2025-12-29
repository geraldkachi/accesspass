/* eslint-disable no-console */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import createApiClient from "../api_services/axios_config";

function useCustomMutation(props) {
	const isLoading = useState(false);

	const queryClient = useQueryClient();

	const { showApiErrorMesssage = false, showApiSuccessMesssage = false, invalidateKeys = [], method, url } = props;

	const makeRequest = async (body = {}) => {
		isLoading[1](true);
		try {
			// const axiosInstance = await createApiClient();

			const axiosResponse = await createApiClient()({
				method,
				url,
				data: body,
			});

			// strip off axios data layer. the result is exactly what is sent from the backend
			const response = axiosResponse.data;
			// check if the status field on backend response is true. show success message or custom message(if configured)
			if (response?.status) {
				if (props?.customSuccessMessage?.trim()) {
					toast.success(props.customSuccessMessage);
				} else if (showApiSuccessMesssage && response?.message) {
					toast.success(response.message);
				}

				if (invalidateKeys?.length > 0) {
					queryClient.invalidateQueries(invalidateKeys);
				}
			}

			// return response regardless. In some cases, response.status will be false. Do what you want afterwards with the response
			return response;
		} catch (err) {
			console.log(err, "error");
			if (axios.isAxiosError(err)) {
				if (err?.response) {
					const errorData = err.response.data;
					if (props?.customErrorMessage?.trim()) {
						toast.error(props.customErrorMessage);
					} else if (showApiErrorMesssage && errorData?.message) {
						toast.error(errorData.message);
					}
				} else if (err?.request) {
					// The request was made but no response was received
					toast.error(
						"We are unable to complete this operation at this time. Please try again or contact our support team."
					);
				}
			}
			console.warn(err);

			throw err;
		} finally {
			isLoading[1](false);
		}
	};

	return {
		makeRequest,
		isLoading: isLoading[0],
	};
}

export default useCustomMutation;

// Usage

// const api = useCustomMutation<{email:string}>({method:"post", url: "http://localhost",...otherAllowedOptions})

// api.makeRequest({email: "test@yahoo.com"}).then(response => {
// if there's need to do something with the response or do something after the request was successful. Here is where your code should go
// })

// you also have access to api.loading
