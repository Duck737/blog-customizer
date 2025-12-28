import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleForm = {
	setArticleState: Dispatch<SetStateAction<typeof defaultArticleState>>;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};
	const resetForm = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState(defaultArticleState);
	};
	const asideRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: () => setIsOpen(false),
	});
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h2'>Задайте параметры</Text>
					<Select
						title='Шрифт'
						selected={font}
						onChange={setFont}
						options={fontFamilyOptions}></Select>
					<RadioGroup
						key={fontSize.value}
						name={'fontSize'}
						options={fontSizeOptions}
						onChange={setFontSize}
						selected={fontSize}
						title={'размер'}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}></Select>
					<Select
						title='Ширина контента'
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={resetForm}
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
