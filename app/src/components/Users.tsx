import React from "react";

import "./style/users.css";

type dataUsers = {
    isLoaded: boolean,
    items: object[],

}

class Users extends React.Component<any, dataUsers> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoaded: false,
            items: [],

        }
    }

    async componentDidMount() {
        const url = 'http://localhost:3000/data.json';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            isLoaded: true,
            items: data.users,

        });
    }

    render() {

        const {isLoaded, items} = this.state;

        if (!isLoaded) {
            return <p>Зачекайте, дані завантажуються</p>
        }
        const valueInput = this.props.valueInput;

        // sort by time
        const sortItem = items.sort((date1: any, date2: any): any => {
            if (date1['time'] > date2['time']) return 1;
            if (date1['time'] < date2['time']) return -1;
        })

        //sort read/unread
        //  const sortItem = items.sort((elem1: any, elem2: any): any => {
        //     return elem1['status'] - elem2['status'];
        //  })

        const foundItems = !valueInput
            ? []
            : sortItem
                .filter((item: any) =>
                    item['name'].includes(valueInput) ||
                    item['phone'].includes(valueInput) ||
                    item['description'].includes(valueInput)
                );

        return (
            <>
                <div className='containerUsers'>
                    <div className='refresh'>
                        <img src='./icons/refresh.svg' alt='refresh' onClick={() => this.props.refreshData()}/>
                        <p>Знайдено <span>{foundItems.length}</span> клієнтів</p>
                    </div>
                    {foundItems.map((user: any) => {

                            const name = user['name'].replace(valueInput, `<span class="highlight">${valueInput}</span>`);
                            const phone = user['phone'].replace(valueInput, `<span class="highlight">${valueInput}</span>`);
                            const description = user['description'].replace(valueInput, `<span class="highlight">${valueInput}</span>`);

                            return (
                                <div className={user['status'] ? 'unread' : 'read'}
                                     key={user['id']}>
                                    <div className='userPhoto'>
                                        <div className={user['female'] ? 'containerImgFemale' : 'containerImgMale'}>
                                            <img src={user['img']} alt=""/>
                                        </div>
                                        <div className='containerIcon'>
                                            <img src={user['icon']} alt=""/>
                                        </div>
                                    </div>
                                    <div className='blockNameDescription'>
                                        <div className='userName'>
                                            <p className='name' dangerouslySetInnerHTML={{
                                                __html: name
                                            }}/>
                                            <p className='phoneUser' dangerouslySetInnerHTML={{
                                                __html: phone
                                            }}/>
                                        </div>
                                        <div className='description'>
                                            <p dangerouslySetInnerHTML={{
                                                __html: description
                                            }}/>
                                        </div>
                                    </div>
                                    <div className='blockTimeDate'>
                                        <div className='time'>
                                            <p>{user['time']}</p>
                                        </div>
                                        <div className='date'>
                                            <p>{user['date']}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
                {/*<p className='pages'>1 2 3...4 5 6</p>*/}
            </>
        )

    }
}

export default Users