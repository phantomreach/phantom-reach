
using UnityEngine;
using System.Net.Sockets;
using System.IO;
using System.Threading;

public class TCPClient : MonoBehaviour
{
    private TcpClient client;
    private StreamReader reader;
    private Thread clientThread;
    public GameObject virtualHand;

    private void Start()
    {
        clientThread = new Thread(new ThreadStart(ConnectToServer));
        clientThread.Start();
    }

    private void ConnectToServer()
    {
        client = new TcpClient("localhost", 8080);
        reader = new StreamReader(client.GetStream());

        while (client.Connected)
        {
            string jsonData = reader.ReadLine();
            if (jsonData != null)
            {
                var position = JsonUtility.FromJson<Vector2>(jsonData);
                UpdateHandPosition(position);
            }
        }
    }

    void UpdateHandPosition(Vector2 position)
    {
        // Convert position to Unity world space and set virtual hand position
        Vector3 worldPosition = Camera.main.ScreenToWorldPoint(new Vector3(position.x, position.y, 10));
        virtualHand.transform.position = worldPosition;
    }

    private void OnApplicationQuit()
    {
        client.Close();
        clientThread.Abort();
    }
}
