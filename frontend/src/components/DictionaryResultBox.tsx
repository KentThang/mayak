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
					<ul className="list-disc">
						{definition.tr.map((translation) => (
							<li key={translation.text}>
								<strong>{translation.text}</strong>
								{translation.mean?.length > 0 &&
									` - ${translation.mean.map((meaning) => meaning.text).join(', ')}`}
							</li>
						))}
					</ul>
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
				}}
			>
				Yandex.Dictionary
			</a>
		</div>
	)
}

export default DictionaryResultBox
