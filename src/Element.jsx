import { Grid } from "semantic-ui-react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function Element({ element, service, setList }) {
	const { symbol, fullname, atomicnumber } = element;
	return (
		<Grid.Row textAlign="center" verticalAlign="middle">
			<Grid.Column>
				{atomicnumber}
			</Grid.Column>
			<Grid.Column>
				{symbol}
			</Grid.Column>
			<Grid.Column>
				{fullname}
			</Grid.Column>
			<Grid.Column>
					<EditModal element={element} service={service} setList={setList} update />
					<DeleteModal element={element} service={service} setList={setList} />
				</Grid.Column>
		</Grid.Row>
	)
}
export default Element;
