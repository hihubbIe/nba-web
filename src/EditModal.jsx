import { useState } from "react";
import { Button, Form, Header, Icon, Input, Modal } from "semantic-ui-react";

function EditModal({ element, service, setList, update = false }) {
	const [open, setOpen] = useState(false)
	const [symbol, setSymbol] = useState(update ? element.symbol : '');
	const [fullname, setFullname] = useState(update ? element.fullname : '');
  const [atomicnumber, setAtomicNumber] = useState(update ? element.atomicnumber : '0');

  const onSave = () => {
    if (update) {
      service.update({ symbol, fullname, atomicnumber }, () => {
        service.findAll((data) => {
          console.log(data)
          setList([...data])
          setOpen(false);
        });
      });
    } else {
      service.save({ symbol, fullname, atomicnumber }, () => {
        service.findAll((data) => {
          setList([...data])
          setOpen(false);
        });
      });
    }
  }

  return (
    <Modal
      closeIcon
      open={open}
      dimmer='blurring'
      size='tiny'
      trigger={
        update ?
        <Button icon='edit' />
        :
        <Button floated='right' animated='vertical'>
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name='add' />
          </Button.Content>
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon={update ? 'edit' : 'add'} content={update ? `Edit ${fullname}` : 'Add new'} />
      <Modal.Content>
				<Form>
					<Form.Field required={!update}>
						<label>Atomic number</label>
            {
              update ?
              <Input disabled type='text' fluid value={element.atomicnumber} />
              :
              <Input type='number' fluid value={atomicnumber} onChange={(_, data) => setAtomicNumber(`${data.value}`)} />
            }
					</Form.Field>
					<Form.Field required>
						<label>Symbol</label>
						<Input type='text' fluid value={symbol} onChange={(_, data) => setSymbol(data.value)} />
					</Form.Field>
					<Form.Field required>
						<label>Name</label>
						<Input type='text' fluid value={fullname} onChange={(_, data) => setFullname(data.value)} />
					</Form.Field>
				</Form>
      </Modal.Content>
      <Modal.Actions>
        <Button icon='remove' color='red' content='Cancel' onClick={() => setOpen(false)} />
        <Button icon='checkmark' color='green' content={update ? 'Save' : 'Add'} onClick={onSave}
          disabled={symbol.length === 0 || fullname.length === 0 || atomicnumber.length === 0}
        />
      </Modal.Actions>
    </Modal>
  )
}
export default EditModal;
