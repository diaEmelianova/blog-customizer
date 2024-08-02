import { CSSProperties, FormEvent, useState } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from '../../constants/articleProps';

export const App = () => {
	const [state, setState] = useState(defaultArticleState);

	const handleSubmit = (data: ArticleStateType) => {
		setState(data);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleSubmit} defaultStateForm={state} />

			<Article />
		</main>
	);
};
