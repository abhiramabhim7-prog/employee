import React, { useState } from 'react'

function Register() {
    const employeesData = [
        {
            id: 1,
            name: "Arun ",
            gender: "Male",
            age: "28",
            email: "arun@gmail.com",
            phone: 9656423510,
            department: "IT",
            position: "Developer",
            salary: "30000",
            address: "kochi,kerala"
        },
        {
            id: 2,
            name: "Sanal",
            gender: "Male",
            age: "26",
            email: "sanal@gmail.com",
            phone: 9558423310,
            department: "HR",
            position: "HR manager",
            salary: "35000",
            address: "malappuram,kerala"
        },
        {
            id: 3,
            name: "Sana",
            gender: "Female",
            age: "23",
            email: "sana@gmail.com",
            phone: 9068523910,
            department: "Sales",
            position: "Sales Executive",
            salary: "30000",
            address: "kozhikode,kerala"
        },

    ]
    const emptyForm = {
        id: "",
        name: "",
        gender: "",
        age: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
        address: "",
    }



    const [employees, setEmployees] = useState(employeesData)
    const [search, setSearch] = useState("")
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [showForm, setShowForm] = useState(false)
    const totalEmployees = employees.length
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const totalMale = employees.filter(
        (emp) => emp.gender === "Male"
    ).length

    const totalFemale = employees.filter(
        (emp) => emp.gender === "Female"
    ).length

    const filteredEmployees = employees.filter((emp) =>
        `${emp.id} ${emp.name} ${emp.email} ${emp.department}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const openAddForm = () => {
        setForm(emptyForm)
        setEditId(null)
        setShowForm(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editId !== null) {
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === editId
                        ? { ...form, id: editId }
                        : emp
                )
            )
            if (selectedEmployee?.id === editId) {
                setSelectedEmployee({ ...form, id: editId })

            }
        } else {
            const newEmployee = {
                ...form,
                id: Date.now(),
            }

            setEmployees((prev) => [...prev, newEmployee])
            setSelectedEmployee(newEmployee)
        }
        setShowForm(false);
        setForm(emptyForm);
        setEditId(null);
    }

    const handleEdit = (emp) => {
        setForm({
            name: emp.name,
            gender: emp.gender,
            age: emp.age,
            email: emp.email,
            phone: emp.phone,
            department: emp.department,
            position: emp.position,
            salary: emp.salary,
            address: emp.address
        })

        setEditId(emp.id)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        )
        if (!confirmed) return

        setEmployees((prev) => prev.filter((emp) => emp.id !== id))

        if (selectedEmployee?.id === id) {
            setSelectedEmployee(null)
        }
    }
    return (
        <div className='main'>
            <header>
                <div className="header">
                    <h1>Employees Management</h1>
                    <p>Manage your employees in one app.</p>
                </div>
            </header>

            <section className="status">
                <div className='total-status' >
                    <p>Total Employees</p>
                    <h2>{totalEmployees}</h2>
                    <span>All Employees</span>
                </div>
                <div className='total-male' >
                    <p>Total Male Employees</p>
                    <h2>{totalMale}</h2>
                    <span>Male Team Members</span>
                </div>
                <div className='total-female' >
                    <p>Total Female Employees</p>
                    <h2>{totalFemale}</h2>
                    <span>Female Team Members</span>
                </div>
            </section>

            <section className='info'>
                <div className='dis'>
                    <h2>Employee List</h2>
                    <p>View and manege employee information.</p>
                </div>

                <div className='searchbar'>
                    <input type="text"
                        placeholder='Search eployees...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button onClick={openAddForm}>+ Add employee</button>
                </div>
            </section>

            {showForm && (
                <section className='formCard'>
                    <div className="formHeading">
                        <h2>
                            {editId !== null ? "Edit Employee" : "Add Employee"}
                        </h2>

                        <button
                            type='button'
                            onClick={() => setShowForm(false)}
                        >
                            ✕</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid">
                            <label htmlFor="name">
                                Full Name*
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder='Enter full name' />
                            </label>

                            <label htmlFor="gender">
                                Gender*
                                <select name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    id="gender">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>

                            <label htmlFor="email">
                                Email*
                                <input type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder='email@gmail.com' />
                            </label>

                            <label htmlFor="age">
                                Age*
                                <input type="number"
                                    name="age"
                                    value={form.age}
                                    onChange={handleChange} />
                            </label>

                            <label htmlFor="phone">
                                Phone*
                                <input type="number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange} />
                            </label>

                            <label htmlFor="department">
                                Department*
                                <input type="text"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder='e.g. IT' />
                            </label>

                            <label htmlFor="position">
                                Position*
                                <input type="text"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    placeholder='e.g. Developer    ' />
                            </label>

                            <label htmlFor="salary">
                                Salary*
                                <input type="number"
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange} />
                            </label>

                            <label htmlFor="address">
                                Address*
                                <input type="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder='Enter address' />
                            </label>

                        </div>

                        <div className="action">
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save">{editId !== null ? "Update Employee" : "Save employee"}</button>
                        </div>
                    </form>

                </section>
            )}


            <section className='table'>
                <div className="item-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr
                                    key={emp.id}
                                    className=
                                    {
                                        selectedEmployee?.id === emp.id
                                            ? "selected-row"
                                            : ""
                                    }
                                    onClick={() =>  setSelectedEmployee(emp)}
                                    >
                                    <td>{emp.id}</td>
                                    <td><button className='namebt'>{emp.name}</button> </td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.phone}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.salary}</td>
                                    <td>
                                        <button className="edit"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleEdit(emp)
                                            }}

                                        >Edit</button>
                                        <button className="delete"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(emp.id)
                                            }}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td colSpan="9">No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedEmployee && employees.some(
                (emp) =>
                    emp.id === selectedEmployee.id
            ) && (

                    <section className='details'>
                        <div className="dthead">
                            <div>
                                <h2>Employee Details</h2>
                                <p>Complete information about the selected employee.</p>
                            </div>

                            <button
                            onClick={() =>  setSelectedEmployee(null)}
                            >
                                ✕
                            </button>

                        </div>

                        <div className="grid">
                            <div>
                                <p>Full Name</p>
                                <h4>{selectedEmployee.name}</h4>
                            </div>
                            
                            <div>
                                <p>Employee ID</p>
                                <h4>{selectedEmployee.id}</h4>
                            </div>

                            <div>
                                <p>Gender</p>
                                <h4>{selectedEmployee.gender}</h4>
                            </div>

                            <div>
                                <p>Age</p>
                                <h4>{selectedEmployee.age}</h4>
                            </div>

                            <div>
                                <p>Email</p>
                                <h4>{selectedEmployee.email}</h4>
                            </div>

                            <div>
                                <p>Phone</p>
                                <h4>{selectedEmployee.phone}</h4>
                            </div>

                            <div>
                                <p>Department</p>
                                <h4>{selectedEmployee.department}</h4>
                            </div>

                            <div>
                                <p>Position</p>
                                <h4>{selectedEmployee.position}</h4>
                            </div>

                            <div>
                                <p>Salary</p>
                                <h4>₹{selectedEmployee.salary}</h4>
                            </div>

                            <div>
                                <p>Address</p>
                                <h4>{selectedEmployee.address}</h4>
                            </div>

                            

                            


                        </div>
                    </section>
                )}


        </div>
    )
}

export default Register
