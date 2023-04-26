import { FlatList, View } from 'react-native';
import WeatherItem from './weatherItem';

const weatherList = function({data}) {
    return <FlatList
                data={data}
                renderItem={({item}) => <WeatherItem item={item}></WeatherItem>}
                ListFooterComponent={(<View style={{height: 100}}/>)}
            />
}
export default weatherList;