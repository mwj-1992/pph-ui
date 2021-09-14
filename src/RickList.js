import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import _ from "lodash";
import Pagination from './Pagination';
import moment from 'moment';
import { getUrlParams, setUrlParams, highlightFilterResult } from './helpers.js'


export const RickList = () => {
    const PageSize = 20;
    const [apiResponse, setApiResponse] = useState({ data: [], count: 0 })
    const initialState = {
        name: getUrlParams("name") || "",
        gender: getUrlParams("gender") || "",
        type: getUrlParams("type") || "",
        created: getUrlParams("created") || "",
        species: getUrlParams("species") || "",
        location: getUrlParams("location") || "",
        origin: getUrlParams("origin") || "",
        offset: Number(getUrlParams("offset") || 1)
    };
    const [currentPage, setCurrentPage] = useState(initialState.offset);
    const [search, setSearch] = useState(initialState);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setUrlParams('offset', Number(currentPage));
        setSearch({ ...search, currentPage })
        return apiResponse.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    const [isLoading, setIsLoading] = useState(false);
    document.title = "Rick & Morty";

    const loadUsers = () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        axios
            .get(
                `${process.env.REACT_APP_API_HOST}/api/ricknmorty${window.location.search}`
            )
            .then(function (response) {
                setApiResponse({ ...response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        console.log(apiResponse);
    }, [apiResponse])

    const filter = (e) => {
        setUrlParams(e.target.name, e.target.value);
        setUrlParams('offset', 0);
        setSearch({ ...search, [e.target.name]: e.target.value, offset: 0 });
    };
    useEffect(() => {
        loadUsers();
    }, [search])

    return <div className="container-fluid">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                        <label>
                            Name
                            <input
                                value={search.name}
                                name="name"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Name"
                                title="Seach by name"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Status
                            <input
                                value={search.status}
                                name="status"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Status"
                                title="Seach by Status"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Gender
                            <select name="gender" value={search.gender} onChange={(e) => filter(e)}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Location
                            <input
                                value={search.location}
                                name="location"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Location"
                                title="Seach by location"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Origin
                            <input
                                value={search.origin}
                                name="origin"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Origin"
                                title="Seach by Origin"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Type
                            <input
                                value={search.type}
                                name="type"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Type"
                                title="Seach by Type"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>
                            Species
                            <input
                                value={search.species}
                                name="species"
                                onChange={(e) => filter(e)}
                                type="text"
                                placeholder="Species"
                                title="Seach by Species"
                                minLength="2"
                            />
                        </label>
                    </th>
                    <th scope="col">
                        <label>Image</label>
                    </th>
                    <th scope="col">
                        <label>Episodes</label>
                    </th>
                    <th scope="col">
                        <label>
                            Created At
                            <input
                                value={search.created}
                                onChange={(e) => filter(e)}
                                name="created"
                                type="date"
                                title="Search by Creation date"
                            />
                        </label>
                    </th>
                </tr>
            </thead>
            <tbody>
                {apiResponse.data &&
                    apiResponse.data.map((row, index) => (
                        <tr key={row._id}>
                            <th scope="row">{search.currentPage * PageSize + index + 1}</th>
                            <td><a target="_blank" href={row.url} dangerouslySetInnerHTML={highlightFilterResult(
                                row.name, search.name)}
                            ></a></td>
                            <td
                                dangerouslySetInnerHTML={highlightFilterResult(
                                    row.status,
                                    search.status
                                )}
                            ></td>
                            <td>{row.gender}</td>
                            <td> {row.location?.url != undefined ? <a target="_blank" href={row.location.url}
                            >{row.location.name}</a> : 'N/A'} </td>
                            <td> {row.origin?.url != undefined ? <a target="_blank" href={row.origin.url}> {row.origin.name}</a> : 'N/A'} </td>
                            <td dangerouslySetInnerHTML={highlightFilterResult(
                                row.type,
                                search.type
                            )}
                            ></td>
                            <td dangerouslySetInnerHTML={highlightFilterResult(row.species, search.species)}></td>
                            <td> <img alt="Image " src={row.image} height="45" widht="45" /></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id={`dropdown-${row._id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ({row.episode.length}) Episodes
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby={`dropdown-${row._id}`}>
                                        {row.episode.map((e, index) => <a target="_blank" className="dropdown-item" href={e}>{e.split('episode/')[1]}</a>)}
                                    </div>
                                </div>
                            </td>
                            <td>{moment(row.created).format('LL') || 'N/A'}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={apiResponse.count}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
        />
        {isLoading && <div id="loader"></div>}
    </div >
}
