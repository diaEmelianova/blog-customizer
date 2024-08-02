import { FormEvent, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { useCloseOnOverlay } from '../../hooks/useCloseOnOverlay';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onSubmit: (data: ArticleStateType) => void;
	defaultStateForm: ArticleStateType;
};

export const ArticleParamsForm = ({
	onSubmit,
	defaultStateForm,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultStateForm);

	useCloseOnOverlay({
		isOpen: open,
		onClose: () => setOpen(false),
		rootRef: ref,
	});

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	const changeFontFamily = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const changeFontSize = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const changeFontColor = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const changeContainerWidth = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const changeBgColor = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const resetSidebarState = () => {
		setFormState(defaultStateForm);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit(formState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpened={open} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={changeFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={changeFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={changeBgColor}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={changeContainerWidth}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={resetSidebarState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
