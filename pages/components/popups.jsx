import Image from "next/image";
import React from 'react';
import png1 from '@/public/1.png'
import png2 from '@/public/2.png'
import png3 from '@/public/3.png'
export default function Popups() {
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 1)'
    }}>
      <div style={{
        position: 'relative',
        width: '400px',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px 20px 0 30px',
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '20px',
          height: '20px',
          backgroundColor: '#fff',
          color: '#ccc',
          border: '1px solid #ccc',
          textAlign: 'center',
          lineHeight: '20px',
          borderRadius: '50%',
          fontSize: '12px',
          cursor: 'pointer'
        }}>X</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input type="text" placeholder="Client Company" style={{
            width: '260px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',
          }} />
          <button style={{
            height: '30px',
            padding: '0 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            background: 'linear-gradient(to bottom, #468efc, #b4c7ff)',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }}>Create</button>
        </div>
        <div style={{ marginTop: '5px', border: '1px solid #ccc', width: '260px', paddingLeft: '5px', borderRadius: '5px', fontSize: '12px', color: '#ccc' }}>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png1}></Image>
            <span style={{ marginLeft: '2px' }}>Coogle inc. Calgary branch</span>
          </div>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png2}></Image>
            <span style={{ marginLeft: '2px' }}>a Apple Inc. Manitoba branch Client center</span>
          </div>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png3}></Image>
            <span style={{ marginLeft: '2px' }}>Amazon SAlT distribute potint</span>
          </div>
        </div>
        <div style={{ color: '#ccc', marginBottom: '5px' }}>Description</div>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            borderBottom: '1px solid #ccc',
            padding: '5px 0',
          }}>
            <span style={{ padding: '0 8px' }}>Aa</span>
            <b style={{ padding: '0 8px' }}>B</b>
            <i style={{ padding: '0 8px' }}>I</i>
            <span style={{ textDecoration: "underline", padding: '0 8px' }}>U</span>
            <del style={{ padding: '0 8px' }}>S</del>
            <span style={{ padding: '0 8px' }}>H1</span>
            <span style={{ padding: '0 8px' }} >H2</span>
            <span style={{ padding: '0 8px' }}>H3</span>
          </div>
          <textarea style={{ resize: 'none', width: '100%', height: '100%' }}></textarea>
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px 20px',
            background: '#3c89fc',
            color: '#fff',
            fontSize: '12px',
            borderRadius: '5px',
          }}>Save</div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px 20px',
            marginLeft: '8px',
            background: '#e3e3e3',
            color: '#000',
            fontSize: '12px',
            borderRadius: '5px',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)'
          }}>Cancel</div>
        </div>
        <div style={{ marginTop: '8px' }}>
          <input type="text" placeholder="Add staff" style={{
            width: '100%',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',
          }} />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '4px',
          height: '40px',
          border: '1px solid #ccc',
          fontSize: '12px',
          color: '#ccc',
          borderRadius: '5px',
        }}>
          <Image src={png1} width={20} height={20}></Image>
          <span>Marry Lee</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px',

        }}>
          <Image src={png1} width={20} height={20}></Image>
          <input style={{
            width: '90%',
            height: '40px',
            paddingLeft: '15px',
            border: '1px solid #ccc',
            fontSize: '12px',
            color: '#ccc',
            borderRadius: '20px',
            textAlign: 'start',
            lineHeight: '30px'
          }} 
          placeholder="write a comment..."
          ></input>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '8px' }}>
          <button style={{
            height: '30px',
            padding: '5px 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            background: 'linear-gradient(to bottom, #30b546, #5ed972)',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }}>Submit</button>
        </div>
      </div>
    </main>
  );
}