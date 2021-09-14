export default () => {
    return <div className="container">
        <h4>Checklist items:</h4>
        <p>✅Listing of all Rick & Morty show characters limited to 20 items per page. </p>
        <p>✅Simple "Previous" and "Next" buttons for pagination. </p>
        <p>✅Filtering functionality: I want to be able to filter characters by Name, and Gender. </p>
        <p>✅Simple routing. The app should be able to push the selected filters into browser's URL using the History API, so when a user refreshes or shares the URL, he gets the filters pre-selected upon landing. example /characters?gender=Unknown </p>
        <p>✅The listing items should include All character information (species, gender, origin etc) & the character images </p>
        <p>✅You can either use a NodeJS server or create a serverless html file. </p>
        <p>✅Don't forget to import all the necessary libraries / transpilers ! </p>
        <p>✅Prefer ES6 code. You can use stage-0 TC39 proposals. </p>
        <p>✅Simple webpack setup with babel/sass loaders is recommended. </p>
        <p>✅Deployed on S3(AWS) </p>
        <p>✅Use SASS </p>
        <p>✅Handling of unhandled promise rejections </p>
        <p>✅Make the layout responsive </p>
        
        <p>⭕Use Redux store </p>
        <p>⭕Simple assertion tests </p>
        <p>⭕(For fullstack devs) dockerize the app </p>
    </div>
}