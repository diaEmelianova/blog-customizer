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
    fontFamily: (select: OptionType) => void,
    fontSize: (select: OptionType) => void,
    fontColor: (select: OptionType) => void,
    backgroundColor: (select: OptionType) => void,
    contentWidth: (select: OptionType) => void,
    resetButton: () => void,
    applyButton: (event: FormEvent) => void,
    sideBarState: ArticleStateType,
}

export const ArticleParamsForm = ({
    fontFamily,
    fontSize,
    fontColor,
    backgroundColor,
    contentWidth,
    resetButton,
    applyButton,
    sideBarState
}: ArticleParamsFormProps) => {
    const ref = useRef<HTMLFormElement | null>(null)
    const [open, setOpen] = useState(false);

    useCloseOnOverlay({
        isOpen: open,
        onClose: () => setOpen(false),
        rootRef: ref
    })

    const toggleForm = useCallback(() => {
        setOpen(prevOpen => !prevOpen);
    },[])


	return (
        <>
            <ArrowButton onClick={toggleForm} isOpened={open}/>
            <aside className = {clsx(styles.container, {[styles.container_open] : open})}>
                <form className = {styles.form} ref = {ref} onSubmit = {applyButton}>
                    <Text
                        size = {31}
                        weight = {800}
                        uppercase
                        as = {'h3'}
                        align = 'center'
                    >
                        Задайте параметры
                    </Text>
                    <Select
                        selected = {sideBarState.fontFamilyOption}
                        options = {fontFamilyOptions}
                        onChange = {fontFamily}
                        title = 'Шрифт'/>
                    <RadioGroup
                        name = 'fontSize'
                        options = {fontSizeOptions}
                        selected = {sideBarState.fontSizeOption}
                        onChange = {fontSize}
                        title = 'Размер шрифта'
                    />
                    <Select
                        selected = {sideBarState.fontColor}
                        options = {fontColors}
                        onChange = {fontColor}
                        title = 'Цвет шрифта'
                    />
                    <Separator/>
                    <Select
                        selected = {sideBarState.backgroundColor}
                        options = {backgroundColors}
                        onChange = {backgroundColor}
                        title = 'Цвет фона'
                    />
                    <Select
                        selected = {sideBarState.contentWidth}
                        options = {contentWidthArr}
                        onChange = {contentWidth}
                        title = 'Ширина контента'
                    />
                    <div className={clsx(styles.bottomContainer)}>
                        <Button
                            title='Сбросить'
                            type='reset'
                            onClick = {resetButton}
                        />
                        <Button
                            title='Применить'
                            type='submit'
                        />
                    </div>
                </form>
            </aside>
        </>
    );
};