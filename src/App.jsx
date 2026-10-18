
import React, { useMemo, useState } from "react";
import {
  BarChart3,
  LayoutDashboard,
  Users,
  FileText,
  Handshake,
  ShoppingBag,
  CreditCard,
  Settings,
  CircleHelp,
  Search,
  Bell,
  Download,
  CalendarDays,
} from "lucide-react";

import { stats, quotations, salesTeam } from "./data/dashboardData.js";
import StatCard from "./components/StatCard.jsx";

const nav = [
  { name: "Overview", Icon: LayoutDashboard },
  { name: "Leads", Icon: Users },
  { name: "Quotations", Icon: FileText },
  { name: "Deals & Revenue", Icon: Handshake },
  { name: "Orders", Icon: ShoppingBag },
  { name: "Payments", Icon: CreditCard },
  { name: "Settings", Icon: Settings },
  { name: "Help center", Icon: CircleHelp },
];

const money = (amount) => {
  return "₹" + Number(amount).toLocaleString("en-IN");
};

export default function App() {

  const [active, setActive] = useState("Overview");
  const [range, setRange] = useState("30");
  const [user, setUser] = useState("All Users");
  const [department, setDepartment] = useState("All Departments");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return quotations.filter((quotation) =>
      quotation.service.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Demo multiplier for the date-range dropdown
  const multiplier = range === "Today"? 0.08 : range === "7" ? 0.3 : range === "90" ? 2.1 : 1;

  // Export dashboard data as a CSV file
  function exportCSV() {
    const csvData = [
      ["Metric", "Value"],

      ...stats.map((item) => [
        item.title,
        typeof item.value === "number"
          ? Math.round(item.value * multiplier)
          : item.value,
      ]),

      [],

      ["Service", "Quotations", "Quoted Amount", "Pending"],

      ...rows.map((item) => [
        item.service,
        item.count,
        item.amount,
        item.pending,
      ]),
    ];

    const csv = csvData
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "nexora-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span> <BarChart3 /></span><b> NEXORA <small>BUSINESS SUITE</small> </b>
        </div>
        <p className="nav-heading">WORKSPACE</p>

        {nav.slice(0, 6).map(({ name, Icon }) => (
          <button key={name} onClick={() => setActive(name)} className={`nav-item ${active === name ? "active" : ""}`} >
            <Icon size={17} />
            <span>{name}</span>

            {name === "Leads" && <b className="count">91</b>}
          </button>
        ))}

        <p className="nav-heading manage">MANAGE</p>

        {nav.slice(6).map(({ name, Icon }) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`nav-item ${active === name ? "active" : ""}`}
          >
            <Icon size={17} />
            <span>{name}</span>
          </button>
        ))}

        <div className="user">
          <span className="avatar">AM</span>
          <span><b>Alex Morgan</b> <small>Administrator</small></span>
        </div>

        <div className="storage"> Workspace storage <b>75%</b><i> <span /></i></div>
      </aside>

      {/* Main dashboard */}
      <main className="main">
        {/* Top navigation */}
        <header className="topbar">
          <b className="mobile-brand">NEXORA</b>

          <label className="search">
            <Search size={16} />

            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dashboard..." />
          </label>

          <button className="icon-button" aria-label="Notifications">
            <Bell size={18} />
          </button>
        </header>

        {/* Dashboard content */}
        <div className="content">
          <div className="heading">
            <div>
              <h1> {active === "Overview" ? "Business Performance & Revenue Analytics" : active} </h1>

              <p> Track leads, conversions, quotations, deals, revenue and operations in real time. </p>
            </div>
            <span>Sunday, October 18, 2026</span>
          </div>

          {/* Filters and export button */}
          <div className="filters">
            <label>
              <CalendarDays size={14} />

              <select  value={range} onChange={(event) => setRange(event.target.value)}>
                <option value="Today">Today</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </label>

            <select value={user} onChange={(event) => setUser(event.target.value)} >
              <option>All Users</option>
              <option>Sales Team</option>
              <option>Operations</option>
            </select>

            <select value={department} onChange={(event) => setDepartment(event.target.value)}
            >
              <option>All Departments</option>
              <option>Sales</option>
              <option>Operations</option>
              <option>Finance</option>
            </select>

            <button className="export" onClick={exportCSV}>
              <Download size={14} />
              Export CSV
            </button>
          </div>

          {/* Statistics cards */}
          <section className="stats-grid">
            {stats.map((item) => (
              <StatCard
                key={item.title}
                item={{
                  ...item,
                  value:
                    typeof item.value === "number"
                      ? Math.round(item.value * multiplier)
                      : item.value,
                }}
              />
            ))}
          </section>

          {/* Lead analytics */}
          <section className="top-grid">
            <article className="panel target">
              <h3>◎ Target Achievement</h3>

              <small>Monthly Revenue Target</small>
              <h2>₹85,00,000</h2>

              <p>
                ● Achieved <b>₹1,02,928</b>
              </p>

              <p>
                ● Remaining <b>₹83,97,072</b>
              </p>

              <div className="progress">
                <span />
              </div>
            </article>

            <article className="panel">
              <h3>Lead Funnel</h3>

              <div className="funnel">
                <div>
                  New Leads <b>91</b>
                  <small>100%</small>
                </div>

                <div>
                  Qualified <b>42</b>
                  <small>46.2%</small>
                </div>

                <div>
                  Converted <b>16</b>
                  <small>25.3%</small>
                </div>
              </div>
            </article>

            <article className="panel">
              <h3>
                Daily Lead Trend
                <span className="legend">
                  ● New ● Qualified ● Converted
                </span>
              </h3>

              <div className="line-graph">
                <span>120</span>
                <i />
                <i />
                <i />
                <i />

                <svg viewBox="0 0 500 130" preserveAspectRatio="none">
                  <polyline points="0,112 35,75 70,68 105,100 145,105 190,109 240,112 300,112 360,112 420,112 500,112" />

                  <polyline
                    className="green-line"
                    points="0,118 35,99 70,103 105,111 145,114 190,116 240,118 300,118 360,118 420,118 500,118"
                  />
                </svg>
              </div>

              <div className="chart-labels">
                <span>1 Oct</span>
                <span>7 Oct</span>
                <span>13 Oct</span>
                <span>19 Oct</span>
                <span>25 Oct</span>
                <span>31 Oct</span>
              </div>
            </article>

            <article className="panel">
              <h3>Lead Sources</h3>

              <div className="source-flex">
                <div className="donut">
                  <span>
                    <b>91</b>
                    <small>LEADS</small>
                  </span>
                </div>

                <div className="source-legend">
                  <p>
                    🔵 Google Ads <b>70 (76.9%)</b>
                  </p>

                  <p>
                    🟢 Website <b>21 (23.1%)</b>
                  </p>

                  <p>
                    🟠 Other <b>0 (0%)</b>
                  </p>

                  <p>
                    🟣 Just Dial <b>0 (0%)</b>
                  </p>
                </div>
              </div>
            </article>
          </section>

          {/* Quotation analytics heading */}
          <h2 className="section-title">
            <FileText size={17} />
            Quotation Analytics
          </h2>

          <section className="quote-grid">
            {/* Quotations bar chart */}
            <article className="panel">
              <h3>Quotations by Service / Order Category</h3>

              <div className="bar-chart">
                {quotations.map((item, index) => (
                  <div key={item.service}>
                    <b>{item.count}</b>

                    <span
                      style={{
                        height: `${Math.max(10, (item.count / 56) * 95)}px`,
                      }}
                      className={`bar bar-${index % 4}`}
                    />

                    <small>
                      {item.service.split(" ").slice(0, 2).join(" ")}
                    </small>
                  </div>
                ))}
              </div>
            </article>

            {/* Quotation values */}
            <article className="panel">
              <h3>Quotation Value by Service</h3>

              {quotations.slice(0, 5).map((item, index) => (
                <div className="value-row" key={item.service}>
                  <span className={`swatch swatch-${index}`} />
                  <span>{item.service}</span>
                  <b>{money(item.amount)}</b>
                </div>
              ))}
            </article>

            {/* Quotations table */}
            <article className="panel table-panel">
              <h3>Service Wise Quotation Details</h3>

              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Service / Order</th>
                      <th>Quotes</th>
                      <th>Quoted Amount</th>
                      <th>Accepted</th>
                      <th>Pending</th>
                      <th>Rejected</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((item) => (
                      <tr key={item.service}>
                        <td>{item.service}</td>
                        <td>{item.count}</td>
                        <td>{money(item.amount)}</td>
                        <td>{item.accepted}</td>
                        <td>{item.pending}</td>
                        <td>{item.rejected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {rows.length === 0 && <p>No matching services.</p>}
              </div>
            </article>

            {/* Conversion rate */}
            <article className="panel conversion">
              <h3>Quote to Deal Conversion Rate</h3>
              <div className="ring"><b>21.5%</b></div>
              <p>23 Deals / 107 Quotations</p>
            </article>
          </section>

          {/* Deals and revenue */}
          <h2 className="section-title">
            <CreditCard size={17} />
            Deals & Revenue
          </h2>

          <section className="revenue-grid">
            <article className="panel">
              <h3>Deals Created vs Deal Revenue</h3>

              <div className="revenue-bars">
                {[60, 42, 34, 28, 21, 17].map((value, index) => (
                  <span key={index} style={{ height: `${value}%` }}>
                    <i style={{ height: `${value * 0.7}%` }} />
                  </span>
                ))}
              </div>

              <div className="chart-labels">
                <span>Private Ltd</span>
                <span>General</span>
                <span>Annual</span>
                <span>Other</span>
              </div>
            </article>

            <article className="panel">
              <h3>Revenue by Service Category</h3>

              {[
                ["General Filing", "29.7K", 90],
                ["Private Limited", "26.3K", 80],
                ["FSSAI License", "15.0K", 55],
                ["Annual Compliance", "7.9K", 32],
                ["Other", "6.0K", 22],
              ].map(([name, amount, percentage]) => (
                <div className="service-row" key={name}>
                  <span>{name}</span>

                  <i> <b style={{ width: `${percentage}%` }} /> </i>

                  <strong>₹{amount}</strong>
                </div>
              ))}
            </article>

            <article className="panel">
              <h3>Priority Breakdown</h3>

              <table>
                <thead>
                  <tr>
                    <th>Priority</th>
                    <th>Deals</th>
                    <th>Revenue</th>
                    <th>%</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>🔴 High</td>
                    <td>14</td>
                    <td>₹65,428</td>
                    <td>60.9%</td>
                  </tr>

                  <tr>
                    <td>🟠 Medium</td>
                    <td>9</td>
                    <td>₹37,500</td>
                    <td>39.1%</td>
                  </tr>

                  <tr>
                    <td>🟢 Low</td>
                    <td>0</td>
                    <td>₹0</td>
                    <td>0%</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="panel">
              <h3>Daily Revenue Trend</h3>

              <div className="revenue-bars dual">
                {[70, 88, 78, 100, 85, 96, 92, 35].map(
                  (value, index) => (
                    <span key={index} style={{ height: `${value}%` }}>
                      <i style={{ height: `${value * 0.8}%` }} />
                    </span>
                  )
                )}
              </div>

              <div className="chart-labels">
                <span>1 Oct</span>
                <span>7 Oct</span>
                <span>13 Oct</span>
                <span>19 Oct</span>
                <span>25 Oct</span>
              </div>
            </article>

            <article className="panel">
              <h3>Total vs Collected Revenue</h3>

              <div className="money-box blue-box">
                <small>Total Deal Value</small>
                <b>₹1,82,627</b>
              </div>

              <div className="money-box green-box">
                <small>Net Collected Revenue</small>
                <b>₹1,20,698</b>
              </div>
            </article>
          </section>

          {/* Bottom dashboard sections */}
          <section className="bottom-grid">
            {/* Sales team table */}
            <article className="panel table-panel">
              <h3>Sales Team Activity</h3>

              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Leads</th>
                      <th>Qualified</th>
                      <th>Converted</th>
                      <th>Conversion</th>
                      <th>Quotes</th>
                      <th>Deals</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>

                  <tbody>
                    {salesTeam
                      .filter((member) =>
                        member.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((member) => (
                        <tr key={member.name}>
                          <td>{member.name}</td>
                          <td>{member.leads}</td>
                          <td>{member.qualified}</td>
                          <td>{member.converted}</td>
                          <td>{member.rate}</td>
                          <td>{member.quotes}</td>
                          <td>{member.deals}</td>
                          <td>{money(member.revenue)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Order progress */}
            <article className="panel">
              <h3>Orders & Stage Progress</h3>

              {[
                ["Private Limited", 8, 9],
                ["ISO Certification", 2, 3],
                ["DSC & DIN Services", 2, 3],
                ["Penalty", 2, 2],
                ["LLP Registration", 2, 2],
              ].map(([name, completed, total]) => (
                <div className="stage-row" key={name}>
                  <span>{name}</span>

                  <i>
                    <b style={{ width: `${(completed / total) * 100}%` }} />
                  </i>

                  <strong>{total}</strong>
                </div>
              ))}
            </article>

            {/* Recent CRM activity */}
            <article className="panel table-panel">
              <h3>Recent CRM Activity</h3>

              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Employee</th>
                    <th>Action</th>
                    <th>Record</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>12:14</td>
                    <td>Nancy Singh</td>
                    <td>Lead updated</td>
                    <td>#L-209610</td>
                  </tr>

                  <tr>
                    <td>12:08</td>
                    <td>Nancy Singh</td>
                    <td>Payment recorded</td>
                    <td>#P-1081</td>
                  </tr>

                  <tr>
                    <td>11:53</td>
                    <td>Sneha Choudhary</td>
                    <td>Order created</td>
                    <td>#O-2168</td>
                  </tr>

                  <tr>
                    <td>11:45</td>
                    <td>Sneha Choudhary</td>
                    <td>Deal created</td>
                    <td>#D-822</td>
                  </tr>
                </tbody>
              </table>
            </article>
          </section>

          {/* Footer */}
          <footer>
            Nexora Business Suite
            <span>Demo dashboard · Sample data only</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
