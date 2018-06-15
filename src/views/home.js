import React, { Component } from 'react';

class HomeView extends Component {
  render() {
    return (
        <div className="htmlContainer">
            <div className="htmlWrapper">
                <div className="row">
                    <div className="col-md-6">
                        <h2>THIS IS A MOCK BODY</h2>
                        <p>
                            All of the items contained in this mockup are simply here to fill in space. Hence the forthecoming lorum ipsum.
                        </p>
                        <img src="https://imgs.xkcd.com/comics/computer_problems.png" className="img-cap m-b-10" alt="computer problems" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, condimentum ac magna sed, lacinia lobortis nulla.
                            Vivamus sodales et dui vehicula euismod. Duis ultrices risus ut sapien finibus, id porttitor nulla condimentum. Donec
                            scelerisque elementum libero a lobortis. Sed suscipit cursus lorem sed sollicitudin. Nam ut efficitur turpis, vel
                            consequat enim. Duis dignissim, ipsum nec placerat laoreet, est augue placerat quam, sed ultricies turpis libero
                            a lectus. Cras id varius nisl. Nunc at tincidunt justo. Ut tristique ac libero finibus posuere. Nam auctor, odio
                            sit amet scelerisque viverra, ipsum ante rutrum magna, eu pretium sem elit eget odio. Pellentesque eget pellentesque
                            sapien, ut placerat ipsum.
                        </p>
                        <p>
                            Aliquam imperdiet libero velit, eu semper leo fringilla eu.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, condimentum ac magna sed, lacinia lobortis nulla.
                            Vivamus sodales et dui vehicula euismod. Duis ultrices risus ut sapien finibus, id porttitor nulla condimentum. Donec
                            scelerisque elementum libero a lobortis. Sed suscipit cursus lorem sed sollicitudin. Nam ut efficitur turpis, vel
                            consequat enim. Duis dignissim, ipsum nec placerat laoreet, est augue placerat quam, sed ultricies turpis libero
                            a lectus. Cras id varius nisl. Nunc at tincidunt justo. Ut tristique ac libero finibus posuere. Nam auctor, odio
                            sit amet scelerisque viverra, ipsum ante rutrum magna, eu pretium sem elit eget odio. Pellentesque eget pellentesque
                            sapien, ut placerat ipsum.
                        </p>
                        <img src={require('../images/chart.jpg')} className="img-cap m-b-10" alt="chart" />
                    </div>
                    <div className="col-md-12">
                        <hr />
                        <p>
                            All of the items contained in this mockup are simply here to fill in space. Hence the forthecoming lorum ipsum.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, condimentum ac magna sed, lacinia lobortis nulla.
                            Vivamus sodales et dui vehicula euismod. Duis ultrices risus ut sapien finibus, id porttitor nulla condimentum. Donec
                            scelerisque elementum libero a lobortis. Sed suscipit cursus lorem sed sollicitudin. Nam ut efficitur turpis, vel
                            consequat enim. Duis dignissim, ipsum nec placerat laoreet, est augue placerat quam, sed ultricies turpis libero
                            a lectus. Cras id varius nisl. Nunc at tincidunt justo.
                        </p>
                        <p>
                            Aliquam imperdiet libero velit, eu semper leo fringilla eu. Curabitur at tempor ex, ac semper justo. Morbi ut rutrum ligula.
                            Quisque nibh mauris, luctus eget suscipit ultrices, condimentum eu massa. Integer luctus lorem sed quam placerat
                            mollis. Suspendisse venenatis felis in augue placerat auctor. Proin mollis, velit in euismod malesuada, leo risus
                            elementum orci, commodo aliquam dolor orci pulvinar metus. Duis vestibulum id mauris at hendrerit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default HomeView;