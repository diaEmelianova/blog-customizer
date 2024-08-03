import { useEffect } from 'react';

export type TUseCloseOnOverlay = {
	isOpen?: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseOnOverlay = ({
	rootRef,
	isOpen,
	onClose,
}: TUseCloseOnOverlay) => {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				rootRef.current &&
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				onClose?.();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [rootRef, isOpen, onClose]);
};
