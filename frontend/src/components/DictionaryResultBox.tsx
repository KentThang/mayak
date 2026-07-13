import type { DictionaryResult } from '../types/dictionary'

interface Props {
	result: DictionaryResult
}

function DictionaryResultBox({ result }: Props) {
	return (
		<div className="dictionary-box">
			<hr />
			{result.def.map((definition) => (
				<div key={definition.pos}>
					<h5>{definition.pos}</h5>
					{definition.tr.map((translation) => (
						<p key={translation.text}>{translation.text}</p>
					))}
				</div>
			))}
			<hr />
			Powered by{' '}
			<a
				href="https://tech.yandex.com/dictionary/"
				target="_blank"
				rel="noopener noreferrer"
				style={{
					color: 'inherit',
					textDecoration: 'underline',
				}}
			>
				Yandex.Dictionary
			</a>
		</div>
	)
}

export default DictionaryResultBox
