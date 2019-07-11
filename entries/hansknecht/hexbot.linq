<Query Kind="Program">
  <Reference>&lt;RuntimeDirectory&gt;\WPF\PresentationCore.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\WPF\PresentationFramework.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Collections.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.ComponentModel.DataAnnotations.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Net.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Runtime.Serialization.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Runtime.Serialization.Json.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Windows.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Windows.Forms.DataVisualization.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Windows.Forms.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\WPF\System.Windows.Presentation.dll</Reference>
  <Namespace>System.ComponentModel.DataAnnotations</Namespace>
  <Namespace>System.ComponentModel.DataAnnotations.Schema</Namespace>
  <Namespace>System.Net</Namespace>
  <Namespace>System.Runtime.Serialization</Namespace>
  <Namespace>System.Runtime.Serialization.Json</Namespace>
  <Namespace>System.Windows</Namespace>
  <Namespace>System.Windows.Controls</Namespace>
  <Namespace>System.Windows.Forms</Namespace>
  <Namespace>System.Windows.Media</Namespace>
</Query>

void Main()
{
	hexbot requested = new hexbot() { count = 2 };

	var button = new System.Windows.Controls.Button { Content = "Get Ready for HexBot!" };
	button.FontSize = 24;
	button.Click += (sender, args) =>
	{
		requested.BotRequest();
		button.Background = new SolidColorBrush(ConvertColor(requested.ThisBot.colors[0].value));
		button.Content = $"Thank you!{Environment.NewLine}{requested.ThisBot.colors[0].value}";
		
	};
	button.MouseEnter += (sender, args) =>
	{
		button.Content = $"Do it!{Environment.NewLine}Click Me!";
		button..Foreground = new SolidColorBrush(ConvertColor(requested.ThisBot.colors[1].value));
	};
	PanelManager.DisplayWpfElement(button, "My Button");
	requested.BotRequest();
	requested.ThisBot.Dump();
}
public static System.Windows.Media.Color ConvertColor(string color)
{
	byte[] values = new byte[3];

	values[0] = (byte)int.Parse(color.Substring(1,2), System.Globalization.NumberStyles.AllowHexSpecifier);
	values[1] = (byte)int.Parse(color.Substring(3,2), System.Globalization.NumberStyles.AllowHexSpecifier);
	values[2] = (byte)int.Parse(color.Substring(5,2), System.Globalization.NumberStyles.AllowHexSpecifier);
	
	return System.Windows.Media.Color.FromRgb(values[0], values[1], values[2]);
}
internal static class BotRequest<T>
{
	private static string API_BASE = "http://api.noopschallenge.com";


	public static string GetRequest(T bot)
	{

		WebClient wc = new WebClient { Proxy = null };
		string botName = string.Empty;
		var properties = typeof(T).GetProperties(); 

		foreach (var props in properties)
		{

			string name = props.Name;
			string value = props.GetValue(bot).ToString();

			if (props.Name == "BotName")
			{
				botName = value;
			}
			else if (!String.IsNullOrEmpty(value) && value != "0")
			{
				wc.QueryString.Add(name, value);
			}
		}

		var colors = wc.DownloadString($"{API_BASE}/{botName}");
		return colors;
	}
	public static T ParseJson(string returned)
	{
		T returnedBot;
		MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(returned));
		DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
		returnedBot = (T)ser.ReadObject(ms);
		ms.Close();
		return returnedBot;
		
	}

}
public class hexbot
{
	public string BotName { get; set; } = "hexbot";
	public int count { get; set; }
	public int width { get; set; } 
	public int height { get; set; } 
	public string seed { get; set; } = string.Empty;
	public HexBot ThisBot { get; set; }
	public hexbot()
	{
		this.ThisBot = new HexBot();		
	}
	public void BotRequest()
	{
		string returned = BotRequest<hexbot>.GetRequest(this);
		
		this.ThisBot = BotRequest<HexBot>.ParseJson(returned); 
	}
	
}

[DataContract]
public class Point 
{
	[DataMember]
	public int x { get; set; }
	
	[DataMember]
	public int y { get; set; }
}

[DataContract]
public class Color
{
	[DataMember]
	public string value { get; set; }
	
	[DataMember]
	public Point coordinates { get; set; }
}

[DataContract]
public class HexBot
{
	[DataMember]
	public Color[] colors { get; set; }
	
}