import React from "react";
import ReactSelect, {
	type Props as ReactSelectProps,
	//   components, 
	type DropdownIndicatorProps,
	type MultiValue,
	type SingleValue,
	//   type ActionMeta
} from "react-select";
import clsx from "clsx";

// Define option types
interface SelectOption {
	label: string;
	value: string | number;
}

type OptionType = SelectOption | string;

// Define the props interface
interface SelectInputProps extends Omit<ReactSelectProps<SelectOption>, 'onChange' | 'value' | 'options'> {
	label?: string;
	options: OptionType[];
	value?: string | number | (string | number)[] | null;
	onChange?: (value: string | number | (string | number)[] | null) => void;
	name: string;
	readonly?: boolean;
	error?: string;
	isMulti?: boolean;
	variant?: "dark" | "light";
	className?: string;
	placeholder?: string;
	isLoading?: boolean;
	onBlur?: () => void;
	DropDownIndicator?: React.ComponentType<DropdownIndicatorProps<SelectOption, boolean>>;
}

const SelectInput: React.FC<SelectInputProps> = ({
	label,
	options,
	value,
	onChange,
	name,
	readonly = false,
	error,
	isMulti = false,
	variant = "light",
	className = "",
	placeholder = "",
	isLoading = false,
	onBlur,
	DropDownIndicator,
	...props
}) => {
	// Convert options to ReactSelect format
	const selectOptions: SelectOption[] = options.map((opt) => ({
		label: typeof opt === "string" ? opt : opt.label,
		value: typeof opt === "string" ? opt : opt.value,
	}));

	// Handle value conversion for ReactSelect
	const getSelectValue = () => {
		if (!value) return null;

		if (isMulti && Array.isArray(value)) {
			return selectOptions.filter((v) => value?.includes(v.value));
		}

		return selectOptions.find((v) => v.value === value);
	};

	// Handle change event - properly typed for React Select
	const handleChange = (
		newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
		//   actionMeta: ActionMeta<SelectOption>
	) => {
		if (!newValue) {
			onChange?.(null);
			return;
		}

		if (isMulti) {
			// Multi select - convert readonly array to regular array
			const result = (newValue as SelectOption[]).map((val) => val.value);
			onChange?.(result);
		} else {
			// Single select
			const singleValue = newValue as SelectOption;
			onChange?.(singleValue.value);
		}
	};

	return (
		<div className={clsx("relative w-full", className)}>
			{label && (
				<label htmlFor={name} className="text-yep-label font-C-Regular block mb-[10px] text-base">
					{label}
				</label>
			)}

			<div>
				<ReactSelect<SelectOption, boolean>
					onFocus={() => {
						onBlur?.();
					}}
					isLoading={isLoading}
					isDisabled={readonly}
					isMulti={isMulti}
					options={selectOptions}
					placeholder={placeholder}
					value={getSelectValue()}
					onChange={handleChange}
					components={{
						IndicatorSeparator: () => null,
						...(DropDownIndicator
							? {
								DropdownIndicator: DropDownIndicator,
							}
							: {}),
					}}
					styles={{
						option: (provided, state) => ({
							...provided,
							paddingTop: "10px",
							paddingBottom: "10px",
							backgroundColor: "transparent",
							fontFamily: "Circular-Regular",
							color: "#5F738C",
							":hover": {
								backgroundColor: !state.isDisabled ? "#0066FF11" : undefined,
							},
						}),
						menu: (provided) => ({
							...provided,
							top: "3.1rem",
							zIndex: "20",
						}),
						valueContainer: (provided) => ({
							...provided,
							height: "48px",
							width: "100%",
							borderRadius: "10px",
							minWidth: "300",
							paddingLeft: "16px",
						}),
						control: (provided) => ({
							...provided,
							height: "100%",
							borderRadius: "10px",
							boxShadow: "none",
							border: "1px solid #E6ECF6",
							transition: "all 500ms",
							fontFamily: "Circular-Regular",
							backgroundColor: variant === "light" ? "#ffffff" : "#F4F6F8",

							"&:hover": {
								border: "1px solid #60A5FA",
								outline: "1px solid #60A5FA",
							},
							"&:focus": {
								border: "1px solid #60A5FA",
								outline: "1px solid #60A5FA",
							},
						}),
						container: (provided) => ({
							...provided,
							height: "100%",
						}),

						dropdownIndicator: (provided) => ({
							...provided,
							rotate: "0deg",
						}),
						placeholder: (defaultStyles) => ({
							...defaultStyles,
							color: "#C8D2DF",
							fontFamily: "Circular-Regular",
						}),
						singleValue: (defaultStyles) => ({
							...defaultStyles,
							color: "#5F738C",
							fontFamily: "Circular-Regular",
						}),
						multiValue: (defaultStyles) => ({
							...defaultStyles,
							color: "#5F738C",
							fontFamily: "Circular-Regular",
						}),
					}}
					{...props}
				/>
			</div>
			{error && <div className="text-red-400 font-C-Regular font-MT-semibold mt-1 text-[12px]">{error}</div>}
		</div>
	);
};

export default SelectInput;