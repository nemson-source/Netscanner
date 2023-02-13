const net = require('net');
const fs = require('fs');
const ping = require('ping');
const exec = require('child_process').exec;

const responding = [];
const nonResponding = [];
const openPorts = {};

console.log('clearing files')
fs.writeFile('./nonResponding.txt', '', (err) => {
    if (err) throw err;
});
fs.writeFile('./responding.txt', '', (err) => {
    if (err) throw err;
});
fs.writeFile('./openPorts.json', '', (err) => {
  if (err) throw err;
});

const printResults = () => {
  console.log('writing to files')
  console.log(`Number of responding IP addresses: ${responding.length}`);
  fs.writeFileSync('responding.txt', responding.join('\n'));
  fs.writeFileSync('nonResponding.txt', nonResponding.join('\n'));
  fs.writeFileSync('openPorts.json', JSON.stringify(openPorts, null, 2));
  fs.writeFileSync('log.txt', `scan fait le ${new Date()} nombre de reponce: ${responding.length}\n\n`);
  console.log('scan is done results are in the folwoing files nonResponding.txt, responding.txt and openPorts.json')
  setTimeout(() => {
    console.log('opening files')
    exec('start responding.txt', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stdout);
    });
    exec('start openPorts.json', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stdout);
    });
  }, 3000)
  setTimeout(() => {
    process.exit()
  }, 10000)
};

console.log('starting ip scan')
const scanPorts = (ip) => {
  for (let port = 1; port <= 1000; port++) {
    const socket = new net.Socket();

    socket.on('error', (err) => {
      socket.destroy();
    });

    socket.on('connect', () => {
      openPorts[ip] = openPorts[ip] || [];
      openPorts[ip].push({ port: port, function: getPortFunction(port) });
      socket.end();
    });

    socket.connect(port, ip);
  }
};

const getPortFunction = (port) => {
  switch (port) {
    case 1:
        return "TCPMUX";
      case 5:
        return "RJE";
      case 7:
        return "Echo";
      case 9:
        return "discard";
      case 11:
        return "systat";
      case 13:
        return "daytime";
      case 17:
        return "qotd";       
      case 18:
        return "msp";
      case 19:
        return "chargen";  
      case 20:
        return "FTP - Data";
      case 21:
        return "FTP - Control";
      case 22:
        return "SSH";
      case 23:
        return "Telnet";
      case 25:
        return "SMTP";
      case 29:
        return "MSG ICP";
      case 37:
        return "Time";
      case 42:
        return "nameserver";
      case 43:
        return "WHOIS";
      case 49:
        return "TACACS Login Host";
      case 50:
        return "re-mail-ck";  
      case 53:
        return "DNS";
      case 67:
        return "bootps";
      case 68:
        return "bootpc";    
      case 69:
        return "TFTP";
      case 70:
        return "Gopher";
      case 79:
        return "Finger";
      case 80:
        return "HTTP";
      case 88:
        return "kerberos";  
      case 101:
        return "hostname";
      case 102:
        return "Iso-tsap";  
      case 103:
        return "X.400 Standard";
      case 105:
        return "csnet-ns";
      case 107:
        return "rtelnet	";    
      case 108:
        return "SNA Gateway Access Server";
      case 109:
        return "POP2";
      case 110:
        return "POP3";
      case 111:
        return "sunrpc";
      case 113:
        return "auth";    
      case 115:
        return "SFTP";
      case 117:
        return "uucp-path";  
      case 118:
        return "SQL Services";
      case 119:
        return "NNTP";
      case 123:
        return "ntp";  
      case 135:
        return "RPC";    
      case 137:
        return "netbios-ns";
      case 138:
        return "netbios-dgm"  
      case 139:
        return "NetBIOS Datagram Service";
      case 143:
        return "IMAP";
      case 161:
        return "SNMP";
      case 162:
        return "snmptrap";
      case 177:
        return "xdmcp";    
      case 179:
        return "BGP";
      case 190:
        return "GACP";
      case 194:
        return "IRC";
      case 201:
        return "z39.50";
      case 213:
        return "ipx";    
      case 220:
        return "IMAP3";
      case 369:
        return "rpc2portmap";
      case 370:
        return "codaauth2"    
      case 389:
        return "LDAP";
      case 427:
        return "svrloc";  
      case 443:
        return "HTTPS";
      case 444:
        return "SNPP";
      case 445:
        return "Microsoft-DS";
      case 458:
        return "Apple QuickTime";
      case 515:
        return "printer";
      case 517:
        return "talk";
      case 518:
        return "ntalk"
      case 520:
        return "router";
      case 521:
        return "ripng";
      case 530:
        return "courier";
      case 531:
        return "conference";
      case 532:
        return "netnews";
      case 533:
        return "netwall";
      case 540:
        return "uucp";
      case 543:
        return "klogin";
      case 544:
        return "kshell";                          
      case 546:
        return "DHCPv6 Client";
      case 547:
        return "DHCPv6 Server";
      case 548:
        return "afpovertcp";
      case 554:
        return "rtsp";
      case 556:
        return "remotefs";  
      case 563:
        return "SNEWS";  
      case 569:
        return "MSN";
      case 587:
        return "submission";
      case 631:
        return "ipp";
      case 636:
        return "idaps";
      case 674:
        return "acap";
      case 694:
        return "ha-cluster";
      case 749:
        return "kerberos-adm";
      case 750:
        return "kerberos-iv";
      case 873:
        return "rsync";
      case 903:
        return "VMware ESXi";
      case 913:
        return "apex-edge";    
      case 992:
        return "telnets";
      case 993:
        return "imaps"
      case 995:
        return "pop3s"                      
      case 1080:
        return "Socks";
      default:
        return "unknown";
  }
}

for (let i = 1; i <= 255; i++) {
  const host = `192.168.0.${i}`;

  ping.promise.probe(host)
    .then(res => {
      if (res.alive) {
        responding.push(`${res.host}: ${res.time} ms`);
        scanPorts(res.host);
      } else {
        nonResponding.push(res.host);
      }

      if (responding.length + nonResponding.length === 255) {
        printResults();
      }
    });
}
console.log('starting port scan')
