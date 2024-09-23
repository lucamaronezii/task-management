import { Modal } from 'antd';
import React from 'react';

interface IModal {
    open: boolean;
    onClose: () => void;
}

const NewTaskModal: React.FC<IModal> = ({ open, onClose }) => {
    return (
        <Modal
            title="Nova tarefa"
            open={open}
            onCancel={onClose}
        >
            <></>
        </Modal>
    )
}

export default NewTaskModal
