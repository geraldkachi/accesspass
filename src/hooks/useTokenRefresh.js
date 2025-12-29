/* eslint-disable no-console */
import { useEffect } from "react";
import dayjs from "dayjs";
import storageHelper from "../utils/storage.utils";
import stringHelper from "../utils/strings.utils";
import dateHelper from "../utils/date.utils";
import createApiClient from "../api_services/axios_config";

const useTokenRefresh = (tokenType = "token") => {
	useEffect(() => {
		let timerRef;

		const storageExpiryItem = "expiryTime";
		const storageTokenItem = "token";
		const storageRefreshItem = "refreshToken";

		async function callRefreshTokenApi() {
			try {
				const response = await createApiClient("refreshToken").post("/token/refresh", {});

				if (response.data?.status) {
					clearTimeout(timerRef);
					storageHelper.setItem(storageTokenItem, response.data?.token?.access_token ?? "");
					storageHelper.setItem(
						storageExpiryItem,
						dateHelper.estimateExpiryTimeMilliseconds(response.data.token.expires_in).toString()
					);
					storageHelper.setItem(storageRefreshItem, response.data?.token?.refresh_token ?? "");
					const timeTillExpiration = response.data.token.expires_in * 1000;

					// Refresh the token 20seconds before it expires
					timerRef = setTimeout(() => {
						callRefreshTokenApi();
					}, timeTillExpiration - 20000);
				}
			} catch (error) {
				console.log(error, "refresh Error");
			}
		}

		// check if there's an expiry time in local storage and validate that it's a valid number
		if (
			storageHelper.hasItem(storageExpiryItem) &&
			storageHelper.hasItem(storageRefreshItem) &&
			stringHelper.validateNumberString(storageHelper.getItem(storageExpiryItem) ?? "")
		) {
			const expiresIn = storageHelper.getItem(storageExpiryItem);

			const differenceInMilliseconds = parseInt(expiresIn, 10) - dayjs().valueOf();
			// when the user refreshes the app, check if time remaining is greater that 20seconds
			if (differenceInMilliseconds > 20000) {
				// make the request 20 seconds to expiry time
				const timeToRefreshToken = differenceInMilliseconds - 20000;
				timerRef = setTimeout(() => {
					callRefreshTokenApi();
				}, timeToRefreshToken);
			}
		}

		return () => {
			clearTimeout(timerRef);
		};
	}, [tokenType]);

	return {};
};

export default useTokenRefresh;
