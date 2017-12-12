import React, { Component } from 'react';
import Day from './Day';
import Search from './Search';
import './App.css';
import * as moment from 'moment';

class App extends Component {

    constructor() {
        super();
        this.state = {
            selectYear: new Date().getFullYear(),
            selectMonth: new Date().getMonth(),
            thisDayInString: moment(new Date()).format('YYYYMMDD'),
            arrayForDays: [],
            monthString: [
                'January', 'February',
                'March', 'April', 'May',
                'June', 'July', 'August',
                'September', 'October', 'November',
                'December' ],
            dayString: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            displayMonthString: 'January',
        }
    }

    componentWillMount() {
        this.getCalendar();
    }

    getCalendar()  {
        let arrayForDays = [];
        let year = this.state.selectYear,
            month = this.state.selectMonth,
            lastDay = new Date(year, month + 1, 0).getDate(),
            lastDayOfMonth = new Date(year, month, lastDay),
            lastDayLastOfWeek = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDay).getDay(),
            firstDayOfFirstWeek = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), 1).getDay();
        this.setState(prevState => ({
            displayMonthString: this.state.monthString[month % 12]
        }));

        for (let i = 1; i <= lastDay; i++) {
            let date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), i);
            arrayForDays.push({
                DayNumber: i,
                stringDay: moment(date).format('YYYYMMDD'),
                DayDate: date
            });
        }

        if (lastDayLastOfWeek !== 0) {
            for (let i = 1; i <= 7 - lastDayLastOfWeek; i++) {
                let date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() + 1, i);
                arrayForDays.push({
                    class: 'next',
                    stringDay: moment(date).format('YYYYMMDD'),
                    DayNumber: i,
                    DayDate: date
                });
            }
        }
        if (!(firstDayOfFirstWeek === 1)) {
            let lastDayPrevMonth = new Date(year, month, 0).getDate();
            while (arrayForDays.length % 7 !== 0) {
                let date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() - 1, lastDayPrevMonth);
                arrayForDays.unshift({
                    class: 'prev',
                    stringDay: moment(date).format('YYYYMMDD'),
                    DayNumber: lastDayPrevMonth,
                    DayDate: date
                });
                lastDayPrevMonth--;
            }
        }
        this.setState({
            arrayForDays : arrayForDays
        });
    }

    nextMouth() {
        console.log('asd');
        if (this.state.selectMonth === 11) {
            this.setState(prevState => ({
                selectYear: ++prevState.selectYear,
                selectMonth: 0
            }), this.getCalendar);
        } else {
            this.setState(prevState => ({
                selectMonth: ++prevState.selectMonth
            }), this.getCalendar);
        }
    }
    prevMouth() {
        if (this.state.selectMonth === 0) {
            this.setState(prevState => ({
                selectYear: --prevState.selectYear,
                selectMonth: 11
            }), this.getCalendar);
        } else {
            this.setState(prevState => ({
                selectMonth: --prevState.selectMonth
            }), this.getCalendar);
        }
    }

  render() {

      let calendarHTML = [];
      let arrayForWeeks = [];
      console.log(this.state.arrayForDays);
      this.state.arrayForDays.map((e, i) => {
          if (i % 7 === 0) {
              arrayForWeeks.push([]);
          }
          arrayForWeeks[arrayForWeeks.length - 1].push(
              <Day key={i} daykey={i}
                   stringdate={e.stringDay}
                   stringforday={(this.state.dayString[i] ? this.state.dayString[i] + ', ' : '') + e.DayNumber}
                   classname={'day ' + (e.class || '') + (this.state.thisDayInString === e.stringDay ? ' today' : '')} />
          );
      });
      arrayForWeeks.map((e, i) => {
          calendarHTML.push( <div key={i} className="week"> {e} </div>)
      });

    return (
        <div className="App">
            <header className="App-header">
                <Search />
                {/*<div className="search">*/}
                    {/*<div className="icon">*/}
                        {/*<span className="glyphicon glyphicon-search" placeholder="Собітие дата или учасник"></span>*/}
                    {/*</div>*/}
                    {/*<input className="form-control" type="text"/>*/}
                {/*</div>*/}
            </header>
            <div className="content">
                <div className="controls">
                    <div className="prev">
                        <button onClick={this.prevMouth.bind(this)} type="button" className="btn btn-default"><span className="glyphicon glyphicon-menu-left"/></button>
                    </div>
                    <div className="monthAndYear">
                        Март 2013
                    </div>
                    <div className="next">
                        <button onClick={this.nextMouth.bind(this)} type="button" className="btn btn-default"><span className="glyphicon glyphicon-menu-right"/></button>
                    </div>
                </div>
                <div className="calendar">
                    {calendarHTML}
                </div>
            </div>
        </div>
    );
  }
}

export default App;
