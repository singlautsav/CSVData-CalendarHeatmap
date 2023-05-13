import React, { useEffect, useState, useRef } from "react";
import CalHeatMap from "cal-heatmap";
import Legend from 'cal-heatmap/plugins/Legend';
import {BNF} from './data/BNF'
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import "cal-heatmap/cal-heatmap.css";
import "./App.css";
import Hello from "./Hello";

export default function App() {
  const [data, setData] = useState(BNF);
  const calRef = useRef(null);
  // const cal2Ref = useRef(null);
  // const cal3Ref = useRef(null);
  // const cal4Ref = useRef(null);

  const handleDrop = (droppedData) => {
    setData(droppedData);
  };

  useEffect(() => {
    if (calRef.current) {
      // calRef.current.destroy(data);
    }
      const cal = new CalHeatMap();
      cal.on('mouseover', (event, timestamp, value) => {
        // Handle mouseover event if needed
      });
      // console.log(data)
      cal.paint({
        range:48,
          domain:{
            type:'month',
            label:{
              text:'MMM-YY'
            },
            dynamicDimension:true, gutter:10
          },
          subDomain:{
            type:'day',label:'DD' ,width:40, height:40, radius:10, gutter:2.5
          },
          date:{
            start:new Date('2020-05-05'),
            max:new Date('2024-06-05')
          },
          data:{
            source:data,
            x:'date',
            y:'PL'
          },
          scale: {
            color: {
              // Try some values: Purples, Blues, Turbo, Magma, etc ...
              scheme: 'Cool',
              type: 'symlog',
              domain: [-161040, 740615],
            },
          },
        },
        [
          [
            CalendarLabel,
            {
              position: 'left',
              key: 'left',
              text: () => ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
              textAlign: 'end',
              width: 30,
              padding: [0, 5, 0, 0],

            },
          ],
          [
            Legend,
            {
              label: 'PL',
              itemSelector: '#legend-label',
            },
          ],
          [
            Tooltip,
            {
              enabled: true,
              // text: ()
            }
          ]
        ],
    
        );
      calRef.current = cal;
    
  }, [data]);

  return (
    <div className="App">
      <Hello onDrop={handleDrop} />
      <div id="cal-heatmap"></div>
      {/* <p>New FIle Uploaded here</p> */}
    </div>
  );
}