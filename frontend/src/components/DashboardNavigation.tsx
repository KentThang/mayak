import { Link } from 'react-router-dom'
import SearchModal from './SearchModal'

function DashboardNavigation() {
	return (
		<div
			id="header"
			className="relative flex flex-row items-center justify-between w-100 text-center"
		>
			<div className="nav flex flex-row items-center gap-4">
				<Link className="no-underline text-inherit" to="/">
					<h1>mayak</h1>
				</Link>
				<Link
					className="text-2xl"
					to="/listening"
					title="Listening Training"
				>
					<i
						className="fa-solid fa-ear-listen"
						style={{ color: 'rgb(255, 255, 255)' }}
					/>
				</Link>
				<Link
					className="text-2xl"
					to="/activeuse"
					title="Active Use Training"
				>
					<i
						className="fa-regular fa-comment"
						style={{ color: 'rgb(255, 255, 255)' }}
					></i>
				</Link>
			</div>
			<div className="backdrop-blur-lg absolute left-1/2 -translate-x-1/2 rounded-2xl py-1 px-2">
				<p>
					type any letter or press
					<kbd className="rounded-md border px-1 py-0 mx-1 bg-transparent">
						escape
					</kbd>
					to open command line
				</p>
			</div>
			<SearchModal />
		</div>
	)
}

export default DashboardNavigation
