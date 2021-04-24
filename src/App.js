// import './App.css';
import * as axios from "axios";
import React, {useEffect, useState} from "react";
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized"
import faker from 'faker'
//        return await axios.get(`${hostUrl}concerts/getPage`,{
//             headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
//         })

function App() {
    let [data, setData] = useState([
        {
            age: 23,
            athlete: "Michael Phelps",
            bronze: 0,
            country: "United States",
            date: "24/08/2008",
            gold: 8,
            silver: 0,
            sport: "Swimming",
            total: 8,
            year: 2008
        },])
    useEffect(() => {
        // debugger
        const f = async () => {
            const response = await axios.get(`https://www.ag-grid.com/example-assets/olympic-winners.json`)
            setData(response.data.map((item, index) => {
                return {
                    key: index,
                    age: item.age,
                    athlete: item.athlete,
                    bronze: item.bronze,
                    country: item.country,
                    date: item.date,
                    gold: item.gold,
                    silver: item.silver,
                    sport: item.sport,
                    total: item.total,
                    year: item.year
                }
            }))
            console.log(111)
        }
        f()
    }, [])
    let cache = React.useRef(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100,
        })
    )
// console.log(data )
// console.log('data[0] ', data[70] )
// console.log('data[0] ', data.length )

    return (
        <div>
            <div style={{width: '100vw', height: "100vh"}}>



                <AutoSizer>
                    {({width, height}) => (<List
                        width={width}
                        height={height}
                        rowHeight={cache.current.rowHeight}
                        deferredMassurementCache={cache.current}
                        rowCount={data.length}
                        rowRenderer={({key, index, style, parent}) => {
                            debugger
                            let item = data[index];
                            return (
                                <CellMeasurer key={key}
                                              cache={cache.current}
                                              parent={parent}
                                              columnIndex={0}
                                              rowIndex={index}>
                                    <div style={style}>
                                        <div>
                                            <div><b>name: </b>{item.athlete}</div>
                                            <div><b>age: </b>{item.age}</div>
                                            <div><b>country: </b>{item.country}</div>
                                            <div><b>sport: </b>{item.sport}</div>
                                            <div>
                                                <h3> medals</h3>
                                                <ul>
                                                    <li><big><b>total: </b> {item.total}</big> </li>
                                                    <li><b>gold: </b>gold : {item.gold} </li>
                                                    <li><b>silver: </b>gold :{item.silver}  </li>
                                                    <li><b>bronze: </b>gold :{item.bronze} </li>
                                                </ul>
                                                <div>year: {item.year} </div>
                                                <hr/>
                                            </div>

                                        </div>


                                    </div>
                                </CellMeasurer>);
                        }}
                    />)}
                </AutoSizer>

            </div>
        </div>

        /*      <div>
                 {data.map((item,index)=>(<div key={index}>
                  <div><b>name : </b> {item.athlete}</div>
                  <div><b>age : </b>{item.age}</div>
                  <div> <b> country : </b>{item.country}</div>
                  <ul>
                      <h2>medals</h2>
                      <li>          <div> total number of medal: {item.total}</div></li>
                      <li>          <div> number of gold medal: {item.gold}</div>  </li>
                      <li>          <div> number of silver medal: {item.silver}</div>  </li>
                      <li>          <div> number of bronze medal: {item.bronze}</div> </li>
                  </ul>

                  <div> <b>sport   : </b>{item.sport}</div>
                  <div><b>Year : </b>{item.year}</div>
                     <hr/>
              </div>))}
              </div>*/
    );
}

export default App;
