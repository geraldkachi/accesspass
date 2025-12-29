import { useState } from "react";
import toast from "react-hot-toast";

function useCopyToClipboard(title: string = "Text"): [string | null, (text: string) => Promise<boolean>] {
	const [copiedText, setCopiedText] = useState<string | null>(null);

	const copy = async (text: string): Promise<boolean> => {
		if (!navigator?.clipboard) {
			toast.error(`Couldn't copy ${title.toLowerCase()}`);
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			toast.success(`${title} copied`);
			return true;
		} catch (error) {
			toast.error(`Couldn't copy ${title.toLowerCase()}`);
			setCopiedText(null);
			return false;
		}
	};

	return [copiedText, copy];
}

export default useCopyToClipboard;