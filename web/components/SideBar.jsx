function SideButton({name, icon}){
    return (
    <a href="#" className="d-flex align-items-center p-2 rounded text-decoration-none text-dark sidebar-button">
        <i className={`bi bi-${icon} me-2`} />
        <span>{name}</span>
      </a>
    );
}








function SideBar(){
    return (
    <aside className="bg-white"> 
        <SideButton 
            name="Home"
            icon="house"
        />  

        <SideButton 
            name="nigga"
            icon="house"
        />  
    </aside>
    )
}

export default SideBar