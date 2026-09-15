import { Toast } from "radix-ui";
import "../styling/ActivityToast.css";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type ActivityToastProps = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	message: String
}

const ActivityToast = ({ open, setOpen, message }: ActivityToastProps) => {
	const timerRef = useRef(0);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
	<Toast.Provider swipeDirection="up">
		<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen} duration={2000}>
			<Toast.Title className="ToastTitle">{message}</Toast.Title>
			<Toast.Close />
		</Toast.Root>

		<Toast.Viewport className="ToastViewport" />
	</Toast.Provider>

	)
}

export default ActivityToast