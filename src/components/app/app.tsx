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
	const [Articlestate, SetArticleState] = useState(defaultArticleState);

	const handleSubmit = (data: ArticleStateType) => {
		SetArticleState(data);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': Articlestate.fontFamilyOption.value,
					'--font-size': Articlestate.fontSizeOption.value,
					'--font-color': Articlestate.fontColor.value,
					'--container-width': Articlestate.contentWidth.value,
					'--bg-color': Articlestate.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleSubmit}
				defaultStateForm={Articlestate}
			/>

			<Article />
		</main>
	);
};
