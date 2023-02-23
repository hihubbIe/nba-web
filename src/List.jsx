import { useEffect, useState } from 'react';
import { Divider, Grid, Input, Segment } from 'semantic-ui-react';
import Element from './Element';
import config from './config.json';
import EditModal from './EditModal';

function List ({ service }) {
	// State hooks
	const [list, setList] = useState([]);
	const [filter, setFilter] = useState(null);
	const [loading, setLoading] = useState(false);

	// Effect hook (onLoad)
	useEffect(() => {
		setLoading(true);
		service.findAll((atoms) => {
			setList(atoms);
			setLoading(false);
		});
	}, [service]);

	// Input listener
	const filterChange = (_, data) => {
		setFilter(data.value);
	}

	return (
		<Segment loading={loading}>
			<Grid columns='2' textAlign='center' verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column width='15'>
						<Input icon="search" label="Search" type="text" placeholder={config.grid.searchPlaceholder} fluid onChange={filterChange}/>
					</Grid.Column>
					<Grid.Column width='1'>
						<EditModal service={service} setList={setList}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Divider clearing />
			<Grid divided="vertically" columns={config.grid.columns.length + 1}>
				<Grid.Row key="headers">
					{ config.grid.columns.map(column => <Grid.Column key={column}><b>{column}</b></Grid.Column>)}
					<Grid.Column>
						<b>Actions</b>
					</Grid.Column>
				</Grid.Row>
				{
					list && list.filter(el => !filter || el.fullname.includes(filter)).map(el => <Element element={el} service={service} key={list.indexOf(el)} setList={setList}/>)
				}
			</Grid>
		</Segment>
	)
}
export default List;
