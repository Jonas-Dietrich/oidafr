interface RssItemItemProps {
    item: RssItem
}

const RssItemItem:React.FC<RssItemItemProps> = ({item}) => {
    return (<div>
        <h3>{item.title}</h3>
        <h4>{item.description}</h4>
    </div>);
}
 
export default RssItemItem;