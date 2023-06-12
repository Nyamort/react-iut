import {TabMenu} from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import "@css/header.css"
const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', link: '/home'},
        {label: 'Liste', icon: 'pi pi-fw pi-list', link: '/note/'},
        {label: 'Ajouter une note', icon: 'pi pi-fw pi-pencil', link: '/note/create/'},
        {
            label: 'Se déconnecter', icon: 'pi pi-fw pi-sign-out', function: () => {
                localStorage.removeItem("jwt");
                window.location = "/";
            }
        }
    ];

    useEffect(() => {
        let path = window.location.pathname;
        let index = items.findIndex(item => item.link === path);
        setActiveIndex(index);
    });

    const tabChange = (e) => {
        setActiveIndex(e.index)
        if (e.value.function) {
            e.value.function();
        }else if (e.value.link) {
            navigate(e.value.link);
        }else {
            navigate("/");
        }
    }

    return (
        <div>
            <TabMenu className={"tab-header"} model={items} onTabChange={tabChange} activeIndex={activeIndex}/>
        </div>
    )
}

export default Header