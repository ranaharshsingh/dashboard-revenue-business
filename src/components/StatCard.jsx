import React from 'react';
import { TrendingUp } from 'lucide-react';
export default function StatCard({item}) { 
    return <article className="stat-card">
        <span className={`stat-icon ${item.color}`}>
            <TrendingUp size={16}/>
        </span>
        <p>{item.title}</p>
        <h3>{item.value}</h3>
        <div className="change">↗ {item.change}% <span>vs. previous period</span></div>
            
    </article>;
}
