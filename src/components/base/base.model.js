import axios from 'axios';
import { config } from '../configuration/config';

export const deleteData = (table, id) => {
    const entity = {
        is_delete: 1,
    }

    axios.put(config.url + '/'+ table +'/' + id, entity)
    .then(res => {
        return true;
    }).catch((error) => {
        alert(error);
    });
}
