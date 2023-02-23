import { useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

function DeleteModal({ element, service, setList }) {
	const { fullname } = element;
	const [open, setOpen] = useState(false)

  const onDelete = () => {
    service.delete(element, () => {
      service.findAll((data) => {
        setList(data)
        setOpen(false);
      });
    });
  }

  return (
    <Modal
      closeIcon
      open={open}
      dimmer='blurring'
      size='tiny'
      trigger={<Button icon='delete' />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='delete' content={`Delete ${fullname}`} />
      <Modal.Content>
        <p>Are you sure you want to delete this atom ?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button icon='remove' color='red' content='Cancel' onClick={() => setOpen(false)} />
        <Button icon='checkmark' color='green' content='Delete' onClick={onDelete} />
      </Modal.Actions>
    </Modal>
  )
}
export default DeleteModal;
